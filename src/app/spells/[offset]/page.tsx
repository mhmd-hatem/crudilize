import React from 'react'
import { getSpells, getSpellsCount } from '@/app/actions'
import ClientView from './ClientView';


const limit = 10;
export default async function SpellsPaginated({ params }: Readonly<{ params: { offset: string } }>) {


    const offset = parseInt(params.offset)
    const { status: spellsStatus, data: spellsData, error: spellsError } = await getSpells(true, offset, limit)
    const { status: countStatus, data: countData, error: countError } = await getSpellsCount()

    const status = countStatus === 200 && spellsStatus === 200 ? 200 : 500
    const error = countError ?? spellsError

    return <ClientView status={status} data={spellsData} error={error} page={offset} total={countData?.spellsCount} limit={limit} />
}
