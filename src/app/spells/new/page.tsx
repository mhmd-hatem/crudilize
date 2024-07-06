import SpellInputPage from '@/components/SpellInputPage'
import { Divider } from '@nextui-org/divider'
import React from 'react'

export default function NewSpell() {
    return (
        <main className='flex flex-col gap-4'>
            <h1 className=' text-neutral-600 font-black text-xl'>New Spell</h1>
            <Divider />
            <SpellInputPage />
        </main>
    )
}
