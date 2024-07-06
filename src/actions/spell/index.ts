"use server";

import prisma, { Spell } from "@/services/prismaProvider";

export async function getSpellsCount() {
    try {

        const spellsCount = await prisma.spell.count()

        return {
            status: 200,
            error: null,
            data: {
                spellsCount
            }
        }
    } catch (error) {
        return {
            status: 500,
            error: (error as Error).message,
            data: null
        }
    }
}

export async function getSpells(paginated: boolean = false, page?: number, limit?: number) {

    try {
        const spells = await prisma.spell.findMany({
            orderBy: {
                school: "asc"
            },
            skip: paginated ? page! * limit! : undefined,
            take: paginated ? limit! : undefined
        });

        return {
            status: 200,
            error: null,
            data: {
                spells
            }
        }
    } catch (error: any) {
        return {
            status: 500,
            error: (error as Error).message,
            data: null
        }
    }

}

export async function getSpell(id: number) {


    try {
        const spell = await prisma.spell.findUnique({
            where: {
                id
            }
        });

        if (!spell) {
            return {
                status: 404,
                error: null,
                data: null
            }
        }

        return {
            status: 200,
            error: null,
            data: {
                spell
            }
        }
    } catch (error) {
        return {
            status: 500,
            error: (error as Error).message,
            data: null
        }
    }
}

export async function createSpell(spellDto: Omit<Spell, "id" | "deletedAt">) {

    try {

        const exists = await prisma.spell.findUnique({
            where: {
                name: spellDto.name
            }
        });

        if (exists) {
            return {
                status: 409,
                error: null,
                data: null
            }
        }

        const spell = await prisma.spell.create({
            data: spellDto
        });

        return {
            status: 201,
            error: null,
            data: {
                spell
            }
        }
    } catch (error) {
        return {
            status: 500,
            error: error,
            data: null
        }
    }
}

export async function updateSpell(id: number, spellDto: Omit<Spell, "id" | "deletedAt">) {

    try {

        const exists = await prisma.spell.findUnique({
            where: {
                id
            }
        });

        if (!exists) {
            return {
                status: 404,
                error: null,
                data: null
            }
        }

        const spell = await prisma.spell.update({
            where: {
                id
            },
            data: spellDto
        });

        return {
            status: 200,
            error: null,
            data: {
                spell
            }
        }
    } catch (error) {
        return {
            status: 500,
            error: error,
            data: null
        }
    }
}

export async function deleteSpell(id: number) {

    try {

        const spell = await prisma.spell.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date()
            }
        });

        return {
            status: 200,
            error: null,
            data: {
                spell
            }
        }

    } catch (error) {
        return {
            status: 500,
            error: error,
            data: null
        }
    }
}