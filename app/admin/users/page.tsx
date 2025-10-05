"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Trash2, Users as UsersIcon } from "lucide-react"

interface User {
  id: string
  email: string
  name: string
  surname: string
  company: string
  position: string
  approved: boolean
  createdAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (userId: string, approved: boolean) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, approved })
      })

      if (res.ok) {
        fetchUsers()
      }
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      const res = await fetch(`/api/admin/users?userId=${userId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        fetchUsers()
      }
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }

  const pendingUsers = users.filter(u => !u.approved)
  const approvedUsers = users.filter(u => u.approved)

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">Approve or reject user registrations</p>
      </div>

      {/* Pending Approvals */}
      {pendingUsers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <UsersIcon className="h-5 w-5" />
            Pending Approvals ({pendingUsers.length})
          </h2>
          <div className="grid gap-4">
            {pendingUsers.map((user) => (
              <Card key={user.id} className="p-6 border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{user.name} {user.surname}</h3>
                      <Badge variant="outline" className="bg-orange-100">Pending</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Email:</strong> {user.email}</p>
                      {user.company && <p><strong>Company:</strong> {user.company}</p>}
                      {user.position && <p><strong>Position:</strong> {user.position}</p>}
                      <p><strong>Registered:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(user.id, true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(user.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Approved Users */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Check className="h-5 w-5 text-green-600" />
          Approved Users ({approvedUsers.length})
        </h2>
        {approvedUsers.length === 0 ? (
          <p className="text-muted-foreground">No approved users yet</p>
        ) : (
          <div className="grid gap-4">
            {approvedUsers.map((user) => (
              <Card key={user.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{user.name} {user.surname}</h3>
                      <Badge variant="outline" className="bg-green-100">Approved</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Email:</strong> {user.email}</p>
                      {user.company && <p><strong>Company:</strong> {user.company}</p>}
                      {user.position && <p><strong>Position:</strong> {user.position}</p>}
                      <p><strong>Registered:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleApprove(user.id, false)}
                    >
                      Revoke
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
