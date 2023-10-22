WITH AvgDaysBetweenOrders AS (
SELECT
  C.companyname AS [Customer Name],
  O.orderdate AS [Last Order Date],
  COALESCE(DATEDIFF(DAY, LAG(O.orderdate) OVER (PARTITION BY C.companyname ORDER BY O.orderdate), O.orderdate), 0) AS DaysBetweenOrders
FROM Sales.Customers AS C
JOIN Sales.Orders AS O ON C.custid = O.custid
WHERE C.companyname IN ('Customer AHPOP', 'Customer AHXHT', 'Customer AZJED')
)

SELECT
  [Customer Name],
  MAX([Last Order Date]) AS [Last Order Date],
  DATEADD(DAY, AVG(DaysBetweenOrders), MAX([Last Order Date])) AS [Next Predicted Order]
FROM AvgDaysBetweenOrders
WHERE [Customer Name] IN ('Customer AHPOP', 'Customer AHXHT', 'Customer AZJED')
GROUP BY [Customer Name];