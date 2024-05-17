import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { api } from "@/lib/api"

function App() {
  const [totalSpent, setTotalSpent] = useState(0)
  useEffect(() => { 
    async function fetchTotalSpent() {
      const res = await api.expenses["total-spent"].$get()
      const data = await res.json()
      setTotalSpent(data.total)
    }
    fetchTotalSpent()
  }, [])
  return (
      <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>Total amount spent</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        {totalSpent}
      </CardContent>
      </Card>
  )
}

export default App
