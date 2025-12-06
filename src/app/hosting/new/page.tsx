'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useData } from '@/context/DataContext'

export default function AddHosting() {
  const containerRef = useRef(null)
  const formRef = useRef(null)
  const router = useRouter()
  const { addHosting } = useData()
  const [formData, setFormData] = useState({
    name: '',
    provider: '',
    expiryDate: '',
    ipAddress: '',
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
    
    addHosting({
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      providerId: 'p2', // Mock provider
      expiryDate: formData.expiryDate,
      ipAddress: formData.ipAddress,
    })

    router.push('/')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto pt-20">
      <h1 className="text-4xl md:text-6xl font-bold mb-12 tracking-tighter">
        Add New Hosting
      </h1>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
        <Input 
          label="Plan Name" 
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

        <Input 
          label="IP Address (Optional)" 
          name="ipAddress" 
          value={formData.ipAddress}
          onChange={handleChange}
        />
        <Input 
          label="Client (Optional)" 
          name="client" 
          value={formData.client}
          onChange={handleChange}
        />

        <div className="flex gap-4 pt-8">
          <Button type="submit">Add Hosting</Button>
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
