'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useData } from '@/context/DataContext'

export default function AddDomain() {
  const containerRef = useRef(null)
  const formRef = useRef(null)
  const router = useRouter()
  const { addDomain, hostings } = useData()
  const [formData, setFormData] = useState({
    name: '',
    provider: '',
    expiryDate: '',
    hostingId: '',
    client: ''
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 1,
      })
      
      gsap.from(formRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    addDomain({
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      providerId: 'p1', // Mock provider for now or add logic to find/create
      hostingId: formData.hostingId || undefined,
      status: 'active',
      expiryDate: formData.expiryDate,
    })

    router.push('/')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const hostingOptions = hostings.map(h => ({ value: h.id, label: h.name }))

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto pt-20">
      <h1 className="text-4xl md:text-6xl font-bold mb-12 tracking-tighter">
        Add New Domain
      </h1>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
        <Input 
          label="Domain Name" 
          name="name" 
          required 
          value={formData.name}
          onChange={handleChange}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input 
            label="Provider" 
            name="provider" 
            required 
            value={formData.provider}
            onChange={handleChange}
          />
          <Input 
            label="Expiry Date" 
            type="date" 
            name="expiryDate" 
            required 
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>

        <Select 
          label="Linked Hosting (Optional)" 
          name="hostingId" 
          options={hostingOptions} 
          value={formData.hostingId}
          onChange={handleChange}
        />

        <Input 
          label="Client (Optional)" 
          name="client" 
          value={formData.client}
          onChange={handleChange}
        />

        <div className="flex gap-4 pt-8">
          <Button type="submit">Add Domain</Button>
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
