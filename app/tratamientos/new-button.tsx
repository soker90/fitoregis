'use client';

import { Button } from '@tremor/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import Modal from './modal';
import { useCallback, useState } from 'react';
import { Product } from 'models';

const NewButton = ({ products }: { products: Product[] }) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleClick = () => setOpen(true);
  return (
    <>
      <Button
        className="ml-auto"
        icon={PlusIcon}
        variant="secondary"
        onClick={handleClick}
      >
        Añadir
      </Button>
      <Modal open={open} onClose={handleClose} products={products} />
    </>
  );
};

export default NewButton;
