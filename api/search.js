import express from 'express'
import {createClient} from '@supabase/supabase-js'
import bodyparse from 'body-parser'
const app = express()

const port = 3000
const supabase = createClient(
    'https://yvvtvsrnoewziscrxykr.supabase.co',
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dnR2c3Jub2V3emlzY3J4eWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc1NjI1MzUsImV4cCI6MTk5MzEzODUzNX0.lddwAjn3Ta-d0dRulBbzDu-y2JTJyQv4pHikHbyIQ4g'
);
app.use(bodyparse.json())
app.use(
    bodyparse.urlencoded({
        extended: true,
    })
)

export default async function search(req, res) {
        const {data, error} = await supabase
            .from('bank')
            .select()
.or(`branch.ilike.%${req.query.q.toLowerCase()}%,city.ilike.%${req.query.q.toLowerCase()}%,district.ilike.%${req.query.q.toLowerCase()}%,state.ilike.%${req.query.q.toLowerCase()}%`)
            .order('ifsc',{ascending:true})
.range(parseInt(req.query.offset),parseInt(req.query.offset)+parseInt(req.query.limit)-1)
        res.send(data)
}
