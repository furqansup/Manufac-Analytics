import React from 'react';
import { calculateClassWiseStats } from '../utils'; // Importing necessary utility function

interface GammaTableProps {
  wineData: {
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
    return (wine.Ash * wine.Hue) / wine.Magnesium;
  };

  const classWiseGamma = calculateClassWiseStats(wineData, calculateGamma);

  return (
    <div className='table'>
      <h3>Gamma Table</h3>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(classWiseGamma).map((className) => (
              <th key={className}>Class {className}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {['Mean', 'Median', 'Mode'].map((measure) => (
            <tr key={measure}>
              <td>Gamma {measure}</td>
              {Object.keys(classWiseGamma).map((className) => {
                const values = classWiseGamma[className];
                let statValue = 0;

                if (measure === 'Mean') {
                  // Calculate Mean
                  statValue = values.reduce((sum, val) => sum + val, 0) / values.length;
                } else if (measure === 'Median') {
                  // Calculate Median
                  values.sort((a, b) => a - b);
                  const mid = Math.floor(values.length / 2);
                  statValue = values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid];
                } else if (measure === 'Mode') {
                  // Calculate Mode
                  const valueCounts: { [key: number]: number } = {};
                  values.forEach((val) => {
                    valueCounts[val] = (valueCounts[val] || 0) + 1;
                  });

                  let maxCount = 0;
                  let modes: number[] = [];
                  Object.keys(valueCounts).forEach((key) => {
                    const count = valueCounts[parseInt(key, 10)];
                    if (count > maxCount) {
                      maxCount = count;
                      modes = [parseInt(key, 10)];
                    } else if (count === maxCount) {
                      modes.push(parseInt(key, 10));
                    }
                  });
                  statValue = modes.length === 1 ? modes[0] : NaN; // Consider NaN for multiple modes
                }

                return <td key={`${className}-${measure}`}>{!isNaN(statValue) ? statValue.toFixed(3) : 'NaN'}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GammaTable;
