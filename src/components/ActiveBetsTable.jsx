import React from "react";
import PropTypes from "prop-types";
import "./ActiveBetsTable.css"

// Table component
const ActiveBetsTable = ({ data }) => {
    // Validate that data is an array of objects with exactly 3 keys
    if (!Array.isArray(data) || data.length === 0) {
        return <p>No data available.</p>;
    }

    const firstRow = data[0];
    const columns = Object.keys(firstRow);

    return (
        <table>
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>
                            {col}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex}>
                                {row[col]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// Prop validation
ActiveBetsTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActiveBetsTable;