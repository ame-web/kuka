import React from 'react';
import { Studio } from 'sanity';
import config from '../sanity.config';

export function AdminStudio() {
  return (
    <div style={{ height: '100vh', margin: 0, padding: 0 }}>
      <Studio config={config} />
    </div>
  );
}
