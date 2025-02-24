use truckdeliverydb;
create table truckdata(
id int primary key auto_increment,
truckName varchar(70),
truckNo varchar(70),
driverName varchar(70),
dates date,
materialName varchar(70),
quantity int,
billNo int,
billDate date,
materialQuality varchar(70),
location varchar(70)
);
select * from truckdata;
delete from truckdata where id=1;

ALTER TABLE truckdata DROP COLUMN truckName;
ALTER TABLE truckdata CHANGE materialReturnQuality materialreturnQuality int;


