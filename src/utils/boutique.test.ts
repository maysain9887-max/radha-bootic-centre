import test from 'node:test';
import assert from 'node:assert/strict';
import { getOfflineAnswer, OFFLINE_KNOWLEDGE_BASE } from './offlineKnowledge';
import { OFFICIAL_RATE_LIST } from '../data/boutiqueData';

test('OFFICIAL_RATE_LIST contains core required categories from reference', () => {
  const sadaBlouse = OFFICIAL_RATE_LIST.find((r) => r.id === 'sada-blouse');
  const astarBlouse = OFFICIAL_RATE_LIST.find((r) => r.id === 'astar-blouse');
  const designerBlouse = OFFICIAL_RATE_LIST.find((r) => r.id === 'designer-blouse');
  const lehenga = OFFICIAL_RATE_LIST.find((r) => r.id === 'lehenga-stitching');

  assert.ok(sadaBlouse, 'Sada blouse must exist in rate list');
  assert.equal(sadaBlouse?.price, 100, 'Sada blouse must be ₹100');

  assert.ok(astarBlouse, 'Astar blouse must exist in rate list');
  assert.equal(astarBlouse?.price, 250, 'Astar blouse must be ₹250');

  assert.ok(designerBlouse, 'Designer blouse must exist in rate list');
  assert.equal(designerBlouse?.price, 350, 'Designer blouse base price must be ₹350');

  assert.ok(lehenga, 'Lehenga stitching must exist in rate list');
  assert.equal(lehenga?.price, 700, 'Lehenga base price must be ₹700');
});

test('getOfflineAnswer handles price/rate queries offline', () => {
  const res = getOfflineAnswer('What is the blouse stitching rate and cost?');
  assert.ok(res.reply.includes('100'), 'Must mention ₹100 rate');
  assert.ok(res.reply.includes('250'), 'Must mention ₹250 rate');
  assert.ok(res.reply.includes('350'), 'Must mention ₹350 rate');
});

test('getOfflineAnswer handles measurement guidance queries offline', () => {
  const res = getOfflineAnswer('How do I take measurements for my blouse?');
  assert.ok(res.reply.includes('Bust'), 'Must mention Bust measurement');
  assert.ok(res.reply.includes('Waist'), 'Must mention Waist measurement');
});

test('getOfflineAnswer provides graceful fallback for unknown queries', () => {
  const res = getOfflineAnswer('random query without match');
  assert.ok(res.reply.includes('Radha Bootic Centre'), 'Must include brand greeting');
  assert.ok(res.quickAction?.actionId === 'open_rates', 'Must suggest rate card');
});
