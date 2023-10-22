WITH TotalFreightByShipper AS (
  SELECT
    S.shipperid AS ShipperID,
    S.companyname AS CompanyName,
    SUM(O.freight) AS TotalFreight
  FROM Sales.Shippers AS S
  LEFT JOIN Sales.Orders AS O ON S.shipperid = O.shipperid
  GROUP BY S.shipperid, S.companyname
),
--  TotalCostShipped y TotalItemsShipped 
TotalCostAndItemsShipped AS (
  SELECT
    S.shipperid AS ShipperID,
    SUM(OD.unitprice * OD.qty) AS TotalCostShipped,
    SUM(OD.qty) AS TotalItemsShipped
  FROM Sales.Shippers AS S
  LEFT JOIN Sales.Orders AS O ON S.shipperid = O.shipperid
  LEFT JOIN Sales.OrderDetails AS OD ON O.orderid = OD.orderid
  GROUP BY S.shipperid
)
-- resultados en una sola tabla
SELECT
  TF.ShipperID,
  TF.CompanyName,
  TF.TotalFreight,
  TC.TotalCostShipped,
  TC.TotalItemsShipped
FROM TotalFreightByShipper AS TF
JOIN TotalCostAndItemsShipped AS TC ON TF.ShipperID = TC.ShipperID
ORDER BY
  CASE
    WHEN TF.ShipperID = 2 THEN 1
    WHEN TF.ShipperID = 1 THEN 2
    WHEN TF.ShipperID = 3 THEN 3
    ELSE 4
  END;