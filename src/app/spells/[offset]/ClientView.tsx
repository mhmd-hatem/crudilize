"use client"

import React, { useState } from 'react'
import { ErrorElement } from '@/utils/Elements';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import { Button, ButtonGroup } from "@nextui-org/button";
import { FaPen, FaEye, FaTrash, FaPlus } from "react-icons/fa6";
import { useDisclosure } from '@nextui-org/modal';
import SpellModal from '@/components/SpellModal';
import { Spell } from '@prisma/client';
import { deleteSpell, navigate } from '@/app/actions';
import { Divider } from '@nextui-org/divider';
export default function ClientView({ status, data, error, page, limit, total }: Readonly<{
    status: number,
    data: {
        spells: Spell[]
    } | null,
    error: string | null
    page: number
    limit: number
    total?: number
}>) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const element = ErrorElement({ status, error })
    const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null)

    const handleOpen = (spell: Spell) => {
        setSelectedSpell(spell)
        onOpen()
    }

    const handleClose = () => {
        setSelectedSpell(null)
        onClose()
    }


    return (
        element ?? <main className='flex flex-col gap-4'>
            <h1 className=' text-neutral-600 font-black text-xl'>Spells List</h1>
            <Divider />
            <div className=' flex justify-end items-center px-4'>
                <Button color='success' onPress={() => navigate('/spells/new')} isIconOnly>
                    <FaPlus className='text-white' />
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableColumn>
                        Name
                    </TableColumn>
                    <TableColumn>
                        School
                    </TableColumn>
                    <TableColumn>
                        Class
                    </TableColumn>
                    <TableColumn>
                        Level
                    </TableColumn>
                    <TableColumn>
                        Components
                    </TableColumn>
                    <TableColumn>
                        is Deleted
                    </TableColumn>
                    <TableColumn>
                        Actions
                    </TableColumn>
                </TableHeader>
                <TableBody>
                    {data!.spells.map((spell) => (
                        <TableRow key={spell.id}>
                            <TableCell>{spell.name}</TableCell>
                            <TableCell>{spell.school}</TableCell>
                            <TableCell>{spell.class}</TableCell>
                            <TableCell>{spell.level}</TableCell>
                            <TableCell>{spell.components}</TableCell>
                            <TableCell>{spell.deletedAt ? 'Yes' : 'No'}</TableCell>
                            <TableCell>
                                <ButtonGroup>
                                    <Button color="primary" isIconOnly onPress={() => {
                                        handleOpen(spell)
                                    }}>
                                        <FaEye />
                                    </Button>
                                    <Button isIconOnly color="success" onPress={() => {
                                        navigate(`/spells/edit/${spell.id}`)
                                    }}>
                                        <FaPen className='text-white' />
                                    </Button>
                                    <Button isIconOnly color="danger" onPress={() => {
                                        deleteSpell(spell.id)
                                        navigate(`/spells/${page}`)
                                    }}>
                                        <FaTrash className='text-white' />
                                    </Button>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <SpellModal spell={selectedSpell} visible={isOpen} onClose={handleClose} />
            <Pagination total={total! / limit} page={page + 1} onChange={page => navigate(`/spells/${page - 1}`)} color='secondary' showShadow loop />
        </main>
    )
}
