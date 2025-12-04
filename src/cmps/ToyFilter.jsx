import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service'
import { ToySort } from './ToySort.jsx'




export function ToyFilter({ filterBy, onSetFilter, sortBy, onSetSort, toyLabels }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300)).current


    useEffect(() => {
        debouncedOnSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'select-multiple') {
            value = [...target.selectedOptions].map(option => option.value)
        }
        value = type === 'number' ? +value || '' : value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }


    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }


    const { txt, inStock, labels } = filterByToEdit


    return (
        <section className="toy-filter container">
            <h3>Toys Filter/Sort</h3>
            <form onSubmit={onSubmitFilter} className="filter-form flex align-center">
                <input
                    onChange={handleChange}
                    value={txt}
                    type="text"
                    placeholder="Search"
                    name="txt"
                />
                <select name="inStock" value={inStock || ''} onChange={handleChange}>
                    <option value="">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Not in stock</option>
                </select>
                {toyLabels &&
                    <select
                        multiple
                        name="labels"
                        value={labels || []}
                        onChange={handleChange}
                    >
                        <option disabled value="">Labels</option>
                        <>
                            {toyLabels.map(label => (
                                <option key={label} value={label}>
                                    {label}
                                </option>
                            ))}
                        </>
                    </select>
                }
            </form>
            <ToySort sortBy={sortBy} onSetSort={onSetSort} />
        </section>
    )
}
