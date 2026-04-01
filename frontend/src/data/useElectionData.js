// ============================================================
// useElectionData.js
// Always loads the JSON for page rendering.
// API helpers are available for future direct API calls.
// ============================================================

import { useState, useEffect } from 'react';
import { getPartyColor, getPartyAlliance } from './partyConfig';

export const API_BASE = 'http://localhost:8080/api';

// ── Re-export helpers ─────────────────────────────────────
export { getPartyColor, getPartyAlliance };
export { getPartyColor as partyColors, getPartyAlliance as partyAlliance };

// ── JSON cache ────────────────────────────────────────────
let _cache = null;
let _promise = null;

const fetchElectionData = () => {
  if (_cache) return Promise.resolve(_cache);
  if (_promise) return _promise;
  _promise = fetch('/Election_Results_2024_with_states.json')
    .then(r => {
      if (!r.ok) throw new Error(`Failed to load: ${r.status}`);
      return r.json();
    })
    .then(data => { _cache = data; _promise = null; return data; })
    .catch(err => { _promise = null; throw err; });
  return _promise;
};

// ── Main hook — always uses JSON ──────────────────────────
export const useElectionData = () => {
  const [data,    setData]    = useState(_cache);
  const [loading, setLoading] = useState(!_cache);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (_cache) return;
    setLoading(true);
    fetchElectionData()
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  return { data, loading, error };
};

// ── Slug helpers ──────────────────────────────────────────
export const slugToKey = (slug) =>
  slug.toUpperCase().trim()
    .replace(/-/g, ' ')
    .replace(/\bAND\b/g, '&');

export const keyToSlug = (key) =>
  key.toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and');

// ── State names from JSON ─────────────────────────────────
export const getStateNames = (data) => {
  if (!data) return [];
  return Object.keys(data).map(k => ({
    key: k,
    slug: keyToSlug(k),
    label: k.split(' ').map(w =>
      w.length > 2
        ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        : w.toUpperCase()
    ).join(' ')
  }));
};

// ── Constituencies from JSON ──────────────────────────────
export const getConstituenciesBySlug = (data, slug) => {
  if (!data) return [];
  const key = slugToKey(slug);
  const stateData = data[key];
  if (!stateData) return [];

  return Object.values(stateData).map(c => {
    const sorted = [...(c.candidates || [])].sort(
      (a, b) => b.total_votes_secured - a.total_votes_secured
    );
    const winner   = sorted[0];
    const runnerUp = sorted[1];
    const margin   = winner && runnerUp
      ? winner.total_votes_secured - runnerUp.total_votes_secured : 0;
    const marginPct = c.total_valid_votes > 0
      ? parseFloat(((margin / c.total_valid_votes) * 100).toFixed(1)) : 0;
    const status = marginPct < 3 ? 'CRITICAL' : marginPct < 10 ? 'STABLE' : 'SAFE';

    return {
      id:              `${key.substring(0, 2)}-${c.const_sno}`,
      rawId:           String(c.const_sno),
      name:            c.constituency_name,
      state:           c.state,
      stateSlug:       keyToSlug(c.state),
      winner:          winner?.candidate_name  || 'N/A',
      winnerParty:     winner?.party           || 'N/A',
      runnerUp:        runnerUp?.candidate_name || 'N/A',
      runnerUpParty:   runnerUp?.party          || 'N/A',
      margin,
      marginPct,
      turnout:         c.voter_turnout_pct      || 0,
      totalElectors:   c.total_electors         || 0,
      totalPolled:     c.total_polled            || 0,
      totalValidVotes: c.total_valid_votes       || 0,
      candidates:      sorted,
      status,
    };
  }).sort((a, b) => Number(a.rawId) - Number(b.rawId));
};

export const getConstituencyDetail = (data, stateSlug, constSno) => {
  if (!data) return null;
  const key = slugToKey(stateSlug);
  const stateData = data[key];
  if (!stateData) return null;
  return stateData[String(constSno)] || null;
};

// ── API helpers (available for future direct API calls) ───
export const fetchStateFromAPI = async (stateSlug, year = 2024) => {
  const res = await fetch(`${API_BASE}/state/${stateSlug}?year=${year}&type=LOK_SABHA`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

export const fetchConstituencyFromAPI = async (stateSlug, constSno, year = 2024) => {
  const res = await fetch(`${API_BASE}/constituency/${stateSlug}/${constSno}?year=${year}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

export const fetchStatesFromAPI = async () => {
  const res = await fetch(`${API_BASE}/states?type=LOK_SABHA`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};
