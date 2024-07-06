"use client"

import { AreaType, Class, Components, Spell, SpellSchool } from '@prisma/client'
import React, { useEffect, useRef, useState } from 'react'
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from '@nextui-org/button';
import { updateSpell, navigate, createSpell } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { useBeforeunload } from 'react-beforeunload';



const schools = Object.values(SpellSchool)
const classes = Object.values(Class)
const areaTypes = Object.values(AreaType)
const spellComponents = Object.values(Components)

export default function SpellInputPage({ spell }: { readonly spell?: Spell }) {

    const [name, setName] = useState(spell?.name ?? "")
    const [level, setLevel] = useState(spell?.level ?? 0)
    const [area, setArea] = useState(spell?.area ?? 0)
    const [range, setRange] = useState(spell?.range ?? 0)
    const [school, setSchool] = useState(spell?.school ?? "")
    const [components, setComponents] = useState(spell?.components ?? "")
    const [areaType, setAreaType] = useState(spell?.areaType ?? "")
    const [playerClass, setPlayerClass] = useState(spell?.class ?? "")
    const [description, setDescription] = useState(spell?.description ?? "")
    const [higherLevel, setHigherLevel] = useState(spell?.higherLevel ?? "")
    const [error, setError] = useState("")

    const resetStates = () => {
        setName(spell?.name ?? "")
        setLevel(spell?.level ?? 0)
        setArea(spell?.area ?? 0)
        setRange(spell?.range ?? 0)
        setSchool(spell?.school ?? "")
        setComponents(spell?.components ?? "")
        setAreaType(spell?.areaType ?? "")
        setPlayerClass(spell?.class ?? "")
        setDescription(spell?.description ?? "")
        setHigherLevel(spell?.higherLevel ?? "")
    }


    const isChanged = JSON.stringify({
        name: spell?.name,
        level: spell?.level,
        id: spell?.id,
        deletedAt: spell?.deletedAt,
        area: spell?.area,
        range: spell?.range,
        school: spell?.school,
        components: spell?.components,
        areaType: spell?.areaType,
        class: spell?.class,
        description: spell?.description,
        higherLevel: spell?.higherLevel

    }) != JSON.stringify({
        name,
        level,
        id: spell?.id,
        deletedAt: spell?.deletedAt,
        area,
        range,
        school: SpellSchool[school as keyof typeof SpellSchool],
        components: Components[components as keyof typeof Components],
        areaType: AreaType[areaType as keyof typeof AreaType],
        class: Class[playerClass as keyof typeof Class],
        description,
        higherLevel
    })

    const isLeavingRef = useRef(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isLeavingRef.current) {
                isLeavingRef.current = false;
                resetStates()
            }
        }, 100)
        return () => {
            clearInterval(interval)
        }
    })

    useBeforeunload(isChanged ? (e) => {
        e.preventDefault();
        isLeavingRef.current = true;
        return "Are you sure you want to leave?"
    } : undefined)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isEmpty = !name || !school || !components || !areaType || !playerClass || !description || !higherLevel

        if (isEmpty) {
            return setError("Please fill out all fields")

        }

        if (spell) {
            const { status } = await updateSpell(spell?.id ?? 0, {
                name,
                level,
                area,
                range,
                school: SpellSchool[school as keyof typeof SpellSchool],
                components: Components[components as keyof typeof Components],
                areaType: AreaType[areaType as keyof typeof AreaType],
                class: Class[playerClass as keyof typeof Class],
                description,
                higherLevel
            })


            if (status === 404) {
                return setError("Spell not found")
            }

            if (status === 500) {
                return setError("Server error")
            }


        }
        else {
            const { status } = await createSpell({
                name,
                level,
                area,
                range,
                school: SpellSchool[school as keyof typeof SpellSchool],
                components: Components[components as keyof typeof Components],
                areaType: AreaType[areaType as keyof typeof AreaType],
                class: Class[playerClass as keyof typeof Class],
                description,
                higherLevel
            })


            if (status === 409) {
                return setError("Spell already exists")
            }
            if (status === 500) {
                return setError("Server error")
            }

        }

        return navigate("/spells")

    }

    return (
        <form onSubmit={handleSubmit} className='grid grid-cols-4 gap-4'>
            <Input
                isRequired
                label="Spell Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <Input
                isRequired
                label="Level"
                value={level.toString()}
                type='number'
                onChange={(e) => setLevel(parseInt(e.target.value))}
            />

            <Input
                isRequired
                label="Area"
                type='number'
                value={area.toString()}
                onChange={(e) => setArea(parseInt(e.target.value))}
            />

            <Input
                isRequired
                label="Range"
                type='number'
                value={range.toString()}
                onChange={(e) => setRange(parseInt(e.target.value))}
            />

            <Select
                isRequired
                selectionMode='single'
                label="Spell School"
                defaultSelectedKeys={""}
                className="max-w-xs"
                selectedKeys={[school]}
                onChange={(e) => setSchool(SpellSchool[e.target.value as keyof typeof SpellSchool])}
            >
                {schools.map((school) => (
                    <SelectItem key={school}>
                        {school}
                    </SelectItem>
                ))}
            </Select>

            <Select
                selectionMode='single'
                isRequired
                label="Area Type"
                defaultSelectedKeys={""}
                className="max-w-xs"
                selectedKeys={[areaType]}
                onChange={(e) => setAreaType(AreaType[e.target.value as keyof typeof AreaType])}
            >
                {areaTypes.map((areaType) => (
                    <SelectItem key={areaType}>
                        {areaType}
                    </SelectItem>
                ))}
            </Select>

            <Select
                isRequired
                selectionMode='single'
                label="Spell for"
                defaultSelectedKeys={""}
                className="max-w-xs"
                selectedKeys={[playerClass]}
                onChange={
                    (e) => setPlayerClass(Class[e.target.value as keyof typeof Class])}
            >
                {classes.map((className) => (
                    <SelectItem key={className}>
                        {className}
                    </SelectItem>
                ))}
            </Select>

            <Select
                isRequired
                selectionMode='single'
                label="Components"
                defaultSelectedKeys={""}
                className="max-w-xs"
                selectedKeys={[components]}
                onChange={(e) => setComponents(Components[e.target.value as keyof typeof Components])}
            >
                {spellComponents.map((components) => (
                    <SelectItem key={components}>
                        {components.toUpperCase()}
                    </SelectItem>
                ))}
            </Select>

            <Textarea
                isRequired
                label="Description"
                value={description}
                placeholder='Spell description'
                onChange={(e) => setDescription(e.target.value)}
                classNames={{ base: "col-span-2" }}

            />

            <Textarea
                isRequired
                label="Higher Level"
                value={higherLevel}
                placeholder='Higher level description'
                onChange={(e) => setHigherLevel(e.target.value)}
                classNames={{ base: "col-span-2" }}
            />

            <Button color={spell ? "success" : "primary"} className='w-1/2 !text-white' type="submit">{spell ? "Update" : "Create"}</Button>
            {error && <p className="text-rose-600">{error}</p>}
        </form>
    )
}
