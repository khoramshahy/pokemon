import { Modal } from "@/lib/components";
import { EvolutionTriggers } from "./evolution-triggers";
import { PokemonDetails } from "./pokemon-details";

export interface PokemonModalProps {
  name: string;
  onClose: () => void;
}

export default function PokemonModal({ name, onClose }: PokemonModalProps) {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <PokemonDetails name={name} />
      <EvolutionTriggers />
    </Modal>
  );
}
