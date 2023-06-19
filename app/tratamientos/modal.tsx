'use client';
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { TextInput } from '@tremor/react';
import { Select, SelectItem } from '@tremor/react';
import { Product } from 'models';

const FIELDS = [
  { id: 'cultivo', label: 'Cultivo', placeholder: 'Cultivo' },
  { id: 'fecha', label: 'Fecha', placeholder: 'Fecha' },
  { id: 'para', label: 'Tratamiento para', placeholder: 'Tratamiento para' },
  { id: 'dosis', label: 'Dosis', placeholder: 'Dosis' },
  { id: 'siguiente', label: 'Siguiente', placeholder: 'Siguiente' },
  {
    id: 'aclaraciones',
    label: 'Aclaraciones',
    placeholder: 'Aclaraciones',
    full: true
  }
];

const Modal = ({
  open,
  onClose,
  products
}: {
  open: boolean;
  onClose: () => void;
  products: Product[];
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <form
            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            action="/api/treatments"
            method="post"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-7xl">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      <InformationCircleIcon
                        className="h-6 w-6 text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Añadir tratamiento
                      </Dialog.Title>
                      <div className="mt-2 flex flex-wrap">
                        <div className={'p-4 md:w-1/3'}>
                          <label
                            htmlFor="productoid"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Producto
                          </label>
                          <Select id="productoid">
                            {products.map(({ id, nombre }) => (
                              <SelectItem
                                key={id.toString()}
                                value={id.toString()}
                              >
                                {nombre}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                        {FIELDS.map(({ id, label, placeholder, full }) => (
                          <div
                            className={`p-4 ${full ? 'w-full' : 'md:w-1/3'}`}
                            key={id}
                          >
                            <label
                              htmlFor={id}
                              className="block text-sm font-medium text-gray-700"
                            >
                              {label}
                            </label>
                            <TextInput
                              placeholder={placeholder}
                              name={id}
                              id={id}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={onClose}
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </form>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
