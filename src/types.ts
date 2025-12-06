export interface Provider {
  id: string;
  name: string;
  url?: string;
  type: "domain" | "hosting" | "both";
}

export interface Client {
  id: string;
  name: string;
  email?: string;
  company?: string;
}

export interface Hosting {
  id: string;
  providerId: string;
  clientId?: string; // If owned by client
  name: string; // e.g. "Shared Hosting Plan A"
  expiryDate?: string;
  ipAddress?: string;
}

export interface Domain {
  id: string;
  name: string;
  providerId: string;
  hostingId?: string; // Linked hosting
  clientId?: string; // If owned by client
  expiryDate?: string;
  status: "active" | "expired" | "transferring";
}
