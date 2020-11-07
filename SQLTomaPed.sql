create database TomaPed;

use TomaPed;
create table tblUser(
    intIdUser int auto_increment primary key,
    strDocument varchar(100),
    strName varchar(100),
    strLastName varchar(100),
    strEmail varchar(100),
    strPassword varchar(100),
    strPhone varchar(100),
    strAddress varchar(100),
    intIdTypeUser int,
    intIdZone int
);



create table tblTypeUser (
    intIdTypeUser int auto_increment primary key,
    strDescription varchar(100)
);

create table tblZone(
    intIdZone int auto_increment primary key,
    strDescription varchar(100)
);
alter table tblUser add FOREIGN  key (intIdTypeUser) references tblTypeUser(intIdTypeUser);
alter table tblUser add foreign key(intIdZone) references tblZone(intIdZone);

create table tblCity(
    intIdCity int auto_increment primary key,
    strDescription varchar(100),
    intIdZone int
);
alter table tblCity add foreign key (intIdZone) references tblZone(intIdZone);

create table tblCustomer(
    intIdCustomer int auto_increment primary key,
    strDocument varchar(100),
    strName varchar(100),
    strLastName varchar(100),
    strEmail varchar(100),
    strPhone varchar(100),
    strAddress varchar(100),
    intIdCity int
);
alter table tblCustomer add foreign key(intIdCity) references tblCity(intIdCity);


create table tblOrder(
    intIdOrder int auto_increment primary key,
    dtFechaInicio datetime,
    intNumeroItems int,
    strDescription varchar(200),
    intIdCustomer int,
    intIdUser int,
    intIdStateOrder int
);
alter table tblOrder add foreign key(intIdCustomer) references tblCustomer(intIdCustomer);
alter table tblOrder add foreign key(intIdUser) references tblUser(intIdUser);

create table tblStateOrder(
    intIdStateOrder int auto_increment primary key,
    strDescription varchar(100)
);
alter table tblOrder add foreign key(intIdStateOrder) references tblStateOrder(intIdStateOrder);

create table tblOrderDetail(
    intIdOrderDetail int auto_increment primary key,
    intQuantity int,
    intTotal int,
    intPriceProduct int,
    intIdProduct varchar(200),
    intIdOrder int
);
alter table tblOrderDetail add foreign key (intIdOrder) references tblOrder(intIdOrder);
create table tblProduct(
    intIdProduct varchar(200) primary key,
    strDescription varchar(100),
    strPrice int,
    dtEntry datetime
);
alter table tblOrderDetail add foreign key(intIdProduct) references tblProduct(intIdProduct);



/******* Procedure *******/
/* tblUserType */
DELIMITER $$
create procedure SP_CreateUserType(
    in strDescriptionUserType varchar(100)
)
Begin
    insert into tblTypeUser (strDescription) values(strDescriptionUserType); 
end
$$


/* tblUser */
DELIMITER $$
Create procedure SP_CreateUser (
	in strDocumentUser varchar(100),
    in strNameUser varchar(100),
    in strLastNameUser varchar(100),
    in strEmailUser varchar(100),
    in strPasswordUser varchar(100),
    in strPhoneUser varchar(100), 
    in strAddressUser varchar(100),
    in intIdTypeUser int,
    in intIdZoneUser int
)
Begin
	insert into tblUser 
    (strDocument,strName,strLastName,strEmail,
    strPassword,strPhone,strAddress,intIdTypeUser,intIdZone)
    
    values (strDocumentUser,strNameUser,strLastNameUser,strEmailUser,
    strPasswordUser,strPhoneUser,strAddressUser,intIdTypeUser,intIdZoneUser);
    
end

$$

/* tblZone */
DELIMITER $$
create procedure SP_CreateZone (
    in strDescriptionZone varchar(100)
)
Begin

    insert into tblZone (strDescription) values(strDescriptionZone);

end
$$

DELIMITER $$
create procedure SP_ListZones()
Begin

    select * from tblZone;

End

$$