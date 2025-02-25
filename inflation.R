library(readabs)
library(readxl)
cpi <- read_abs("6401.0")
things_index <- cpi[cpi$table_title == "TABLE 9. CPI: Group, Sub-group and Expenditure Class, Index Numbers by Capital City", ]
write.csv(things_index,"cpi-index.csv", row.names = FALSE)

things_pct <- cpi[cpi$table_title == "TABLE 10. CPI: Group, Sub-group and Expenditure Class, Percentage change from corresponding quarter of previous year by Capital City", ]
write.csv(things_pct,"cpi-pct.csv", row.names = FALSE)
