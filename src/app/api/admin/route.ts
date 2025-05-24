import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    'https://fkrfxnwlarpexykfgjte.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrcmZ4bndsYXJwZXh5a2ZnanRlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODgyNjA0NiwiZXhwIjoyMDU0NDAyMDQ2fQ.ziy5SejcQoVcVudsrCINIBS-uNRD56Z3TYUzmJsauPs' // hanya untuk server
)

export async function GET() {

    const { data, error } = await supabase.auth.admin.listUsers()

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    return new Response(JSON.stringify({ users: data.users }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    })
}