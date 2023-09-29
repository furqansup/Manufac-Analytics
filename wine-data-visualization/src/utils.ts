export const calculateClassWiseStats = (
    wineData: any[],
    propertyOrFunction: string | ((wine: any) => number)
  ): Record<string, number[]> => {
    const classWiseStats: Record<string, number[]> = {};
  
    // Iterating through each wine in the data
    wineData.forEach((wine) => {
      let value;

      // Determining the value based on property or function
      if (typeof propertyOrFunction === 'string') {
        value = wine[propertyOrFunction];
      } else if (typeof propertyOrFunction === 'function') {
        value = propertyOrFunction(wine);
      }
  
      // Got the wine class
      const wineClass = wine.Alcohol.toString();
  
     // Updating class-wise statistics
      if (!classWiseStats[wineClass]) {
        classWiseStats[wineClass] = [value];
      } else {
        classWiseStats[wineClass].push(value);
      }
    });
  
    return classWiseStats;
  };
  