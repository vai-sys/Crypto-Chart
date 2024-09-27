
import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const CryptoSelector = ({
  coins,
  intervals,
  selectedCoin,
  selectedInterval,
  onCoinChange,
  onIntervalChange,
}) => {
  return (
    <div className="flex justify-between mb-5">
      {/* Coin Selector */}
      <Listbox value={selectedCoin} onChange={onCoinChange}>
        <div className="relative mt-1 w-40">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-cyan-300 focus-visible:ring-offset-2 focus-visible:border-cyan-500 sm:text-sm">
            <span className="block truncate">{selectedCoin}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronUpDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {coins.map((coin) => (
                <Listbox.Option
                  key={coin}
                  className={({ active }) =>
                    `${active ? 'text-cyan-900 bg-cyan-100' : 'text-gray-900'}
                    cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={coin}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {coin}
                      </span>
                      {selected && (
                        <span
                          className={`${
                            active ? 'text-cyan-600' : 'text-cyan-600'
                          } absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {/* Interval Selector */}
      <Listbox value={selectedInterval} onChange={onIntervalChange}>
        <div className="relative mt-1 w-40">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-cyan-300 focus-visible:ring-offset-2 focus-visible:border-cyan-500 sm:text-sm">
            <span className="block truncate">{selectedInterval}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronUpDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {intervals.map((interval) => (
                <Listbox.Option
                  key={interval}
                  className={({ active }) =>
                    `${active ? 'text-cyan-900 bg-cyan-100' : 'text-gray-900'}
                    cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={interval}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {interval}
                      </span>
                      {selected && (
                        <span
                          className={`${
                            active ? 'text-cyan-600' : 'text-cyan-600'
                          } absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CryptoSelector;
