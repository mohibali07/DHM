import { Domain, Hosting, Provider, Client } from '@/types'

export const providers: Provider[] = [
  { id: 'p1', name: 'GoDaddy', type: 'domain' },
  { id: 'p2', name: 'Hostinger', type: 'both' },
  { id: 'p3', name: 'Namecheap', type: 'domain' },
  { id: 'p4', name: 'Vercel', type: 'hosting' },
]

export const clients: Client[] = [
  { id: 'c1', name: 'Acme Corp', company: 'Acme Inc.' },
  { id: 'c2', name: 'John Doe', company: 'Personal' },
]

export const hostings: Hosting[] = [
  { id: 'h1', providerId: 'p2', name: 'Premium Shared Hosting', expiryDate: '2025-12-01' },
  { id: 'h2', providerId: 'p4', name: 'Pro Plan', expiryDate: '2026-01-15' },
]

export const domains: Domain[] = [
  { id: 'd1', name: 'acme.com', providerId: 'p1', hostingId: 'h1', clientId: 'c1', status: 'active', expiryDate: '2024-10-10' },
  { id: 'd2', name: 'johndoe.dev', providerId: 'p3', hostingId: 'h2', clientId: 'c2', status: 'active', expiryDate: '2024-11-20' },
  { id: 'd3', name: 'project-x.io', providerId: 'p2', hostingId: 'h1', status: 'expired', expiryDate: '2023-05-01' },
]
