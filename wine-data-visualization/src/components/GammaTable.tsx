import React from 'react';
import { calculateClassWiseStats } from '../utils'; // Importing necessary utility function

interface GammaTableProps {
    // Interface for props
  wineData: {
    // property definitions
    Alcohol: number;
    MalicAcid: number;
    Ash: number;
    AlcalinityOfAsh: number;
    Magnesium: number;
    TotalPhenols: number;
    Flavanoids: number;
    NonflavanoidPhenols: number;
    Proanthocyanins: number;
    ColorIntensity: number;
    Hue: number;
    OD280OD315DilutedWines: number;
    Unknown: number;
  }[];
}

const GammaTable: React.FC<GammaTableProps> = ({ wineData }) => {
    const calculateGamma = (wine: any): number => {
        return (wine.Ash * wine.Hue) / wine.Magnesium; // Calculate Gamma
    };
    
    // Calculate class-wise Gamma statistics
  const classWiseGamma = calculateClassWiseStats(wineData, calculateGamma);

  return (
    <div className='table'>
      <h3>Gamma Table</h3>
      <table className="stats-table">
         {/* Table header */}
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(classWiseGamma).map((className) => (
              <th key={className}>Class {className}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            {/* Table rows for Mean, Median, and Mode */}
          {['Mean', 'Median', 'Mode'].map((measure) => (
            <tr key={measure}>
              <td>Gamma {measure}</td>
              {Object.keys(classWiseGamma).map((className) => {
                const values = classWiseGamma[className];
                let statValue = 0;

                // Calculate the statistical value based on the measure
                if (measure === 'Mean') {
                  statValue = values.reduce((sum, val) => sum + val, 0) / values.length;
                } else if (measure === 'Median') {
                  values.sort((a, b) => a - b);
                  const mid = Math.floor(values.length / 2);
                  statValue = values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid];
                } else if (measure === 'Mode') {
                  const valueCounts: { [key: number]: number } = {};
                  values.forEach((val) => {
                    valueCounts[val] = (valueCounts[val] || 0) + 1;
                  });

                     // Calculate mode
                  let maxCount = 0;
                  let mode = 0;
                  Object.keys(valueCounts).forEach((key) => {
                    const count = valueCounts[parseInt(key, 10)];
                    if (count > maxCount) {
                      maxCount = count;
                      mode = parseInt(key, 10);
                    }
                  });
                  statValue = mode;
                }

                return <td key={`${className}-${measure}`}>{statValue.toFixed(3)}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GammaTable;
