import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }) {
  const { id, image, name, maxCapacity, regularPrice, discount } = cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const handleDuplicateCabin = () => {
    createCabin({
      name: `copy of ${cabin.name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
    });
  };
  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>
        {discount ? formatCurrency(discount) : <span>&mdash;</span>}
      </Discount>
      <div>
        <button disabled={isCreating} onClick={handleDuplicateCabin}>
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.Open opens="edit">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Open opens="delete">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>

          <Modal.Window name="edit">
            <CreateCabinForm toUpdateCabin={cabin} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={`cabin ${name}`}
              onConfirm={() => deleteCabin(id)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
