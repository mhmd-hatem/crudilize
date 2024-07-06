import { getSpell } from '@/actions/spell'
import SpellInputPage from '@/components/SpellInputPage'
import { Divider } from '@nextui-org/divider'
import React from 'react'

export default async function EditSpell({ params }: { readonly params: { id: string } }) {

    const id = parseInt(params.id)

    const { data, error } = await getSpell(id)


    return (
        data ? <main className='flex flex-col gap-4'>
            <h1 className=' text-neutral-600 font-black text-xl'>Edit Spell</h1>
            <Divider />
            <SpellInputPage spell={data.spell} />
        </main> : <div>{error}</div>
    )
}
