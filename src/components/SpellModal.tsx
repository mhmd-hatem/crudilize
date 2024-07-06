import { Spell } from "@prisma/client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

interface SpellModalProps {
    spell: Spell | null;
    visible: boolean;
    onClose: () => void;
}



const SpellModal: React.FC<SpellModalProps> = ({ spell, visible, onClose }) => {
    if (!spell) return null;

    return (
        <Modal isOpen={visible} onClose={onClose} size="5xl">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            {spell.name}
                        </ModalHeader>
                        <ModalBody className="grid grid-cols-3">
                            <span className="col-span-2">ID: {spell.id}</span>
                            <span>Deleted At: {spell.deletedAt ? spell.deletedAt.toString() : 'N/A'}</span>
                            <span>Level: {spell.level}</span>
                            <span>Area: {spell.area ?? 'N/A'}ft</span>
                            <span>Range: {spell.range ?? 'N/A'}ft</span>
                            <span>School: {spell.school}</span>
                            <span>Components: {spell.components}</span>
                            <span>Area Type: {spell.areaType}</span>
                            <span>Class: {spell.class}</span>
                            <p className="col-span-3">Description: {spell.description}</p>
                            <p className="col-span-3">Higher Level: {spell.higherLevel}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )
                }
            </ModalContent>
        </Modal>
    );
};

export default SpellModal;