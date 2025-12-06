'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Domain, Hosting, Provider, Client } from '@/types'
import { domains as initialDomains, hostings as initialHostings, providers as initialProviders, clients as initialClients } from '@/lib/data'

interface DataContextType {
  domains: Domain[]
  hostings: Hosting[]
  providers: Provider[]
  clients: Client[]
  addDomain: (domain: Domain) => void
  addHosting: (hosting: Hosting) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [domains, setDomains] = useState<Domain[]>(initialDomains)
  const [hostings, setHostings] = useState<Hosting[]>(initialHostings)
  const [providers] = useState<Provider[]>(initialProviders)
  const [clients] = useState<Client[]>(initialClients)

  const addDomain = (domain: Domain) => {
    setDomains((prev) => [...prev, domain])
  }

  const addHosting = (hosting: Hosting) => {
    setHostings((prev) => [...prev, hosting])
  }

  return (
    <DataContext.Provider value={{ domains, hostings, providers, clients, addDomain, addHosting }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
