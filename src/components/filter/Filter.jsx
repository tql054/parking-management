import './filter.scss';

const Filter = ( { filter, children } ) => {
    return (
        <div className="filter">
            <div className="filter__title">{filter}</div>   
            <div className="filter__contents">
                {children}
            </div>
        </div>
    )
}

export default Filter