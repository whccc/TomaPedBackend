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

DELIMITER $$
    create procedure SP_ListSellers()
    Begin
        select 
			tblUser.strDocument,tblUser.strName,
            tblUser.strLastName,tblUser.strEmail,tblUser.strPassword,
            tblUser.strPhone,tblUser.strAddress,
            tblZone.strDescription as 'strDescriptionZone',
            (select count(*) from tblOrder where tblOrder.intIdUser=tblUser.intIdUser) as 'NroPedidos'
				from tblUser inner join tblZone on tblZone.intIdZone=tblUser.intIdZone
        where tblUser.intIdTypeUser=2;
    End

$$

DELIMITER $$
    create procedure SP_EditSeller(
        in strDocumentUser varchar(100),
        in strNameUser varchar(100),
        in strLastNameUser varchar(100),
        in strEmailUser varchar(100),
        in strPasswordUser varchar(100),
        in strPhoneUser varchar(100), 
        in strAddressUser varchar(100),
        in intIdZoneUser int
    )
    Begin
    update tblUser set strDocument=strDocumentUser,
                        strName=strNameUser,
                        strLastName=strLastName,
                        strEmail=strEmailUser,
                        strPassword=strPasswordUser,
                        strPhone=strPhoneUser,
                        strAddress=strAddressUser,
                        intIdZone=intIdZoneUser
                        where tblUser.strDocument=strDocumentUser;
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
create procedure SP_EditZone
 (in intIdZoneEdit int,
  in strDescriptionZone varchar(100))
 Begin
    update tblZone set strDescription=strDescriptionZone where tblZone.intIdZone=intIdZoneEdit;
 end
 $$
 
DELIMITER $$
create procedure SP_ListZones()
Begin

    select * from tblZone;

End

$$


/* tblcity */

DELIMITER $$
    create procedure SP_CreateCity(in strDescriptionCity varchar(100),in intIdZoneCity int)
    Begin
        insert into tblCity (strDescription,intIdZone) values(strDescriptionCity,intIdZoneCity);
    end 
$$
DELIMITER $$
    create procedure SP_EditCity(in intIdCityEdit int,in strDescriptionCity varchar(100),in intIdZoneCity int)
    Begin

        update tblCity set strDescription=strDescriptionCity,intIdZone=intIdZoneCity
         where tblCity.intIdCity=intIdCityEdit;

    end
$$
DELIMITER $$
    create procedure SP_ListCities()
    Begin
        select tblCity.intIdCity,tblCity.strDescription,tblZone.strDescription as 'strDescriptionZone'
         from tblCity inner join tblZone on tblZone.intIdZone=tblCity.intIdZone;
    end
$$


/*tblordersate*/

DELIMITER $$
    create procedure SP_CreateOrderState (in strDescriptionOrderState varchar(100))
    Begin   
        insert into tblStateOrder(strDescription) values(strDescriptionOrderState);
    end
$$



/* tblCustomer */
DELIMITER $$
Create procedure SP_CreateCustomer (
	in strDocumentCustomer varchar(100),
    in strNameCustomer varchar(100),
    in strLastNameCustomer varchar(100),
    in strEmailCustomer varchar(100),
    in strPhoneCustomer varchar(100), 
    in strAddressCustomer varchar(100),
    in intIdCityCustomer int
)
Begin
	insert into tblCustomer 
    (strDocument,strName,strLastName,strEmail
    ,strPhone,strAddress,intIdCity)
    values (strDocumentCustomer,strNameCustomer,strLastNameCustomer,strEmailCustomer
       ,strPhoneCustomer,strAddressCustomer,intIdCityCustomer); 
end
$$
DELIMITER $$
    create procedure SP_ListCustomers()
    Begin
        select 
			tblCustomer.strDocument,tblCustomer.strName,
            tblCustomer.strLastName,tblCustomer.strEmail,
            tblCustomer.strPhone,tblCustomer.strAddress,
            tblCity.strDescription as 'strDescriptionCity'
				from tblCustomer inner join tblCity on tblCity.intIdCity=tblCustomer.intIdCity;

    End

$$

DELIMITER $$
    create procedure SP_EditCustomer(
        in strDocumentCustomer varchar(100),
        in strNameCustomer varchar(100),
        in strLastNameCustomer varchar(100),
        in strEmailCustomer varchar(100),
        in strPhoneCustomer varchar(100), 
        in strAddressCustomer varchar(100),
        in intIdCityCustomer int
    )
    Begin
    update tblCustomer set strDocument=strDocumentCustomer,
                        strName=strNameCustomer,
                        strLastName=strLastName,
                        strEmail=strEmailCustomer,
                        strPhone=strPhoneCustomer,
                        strAddress=strAddressCustomer,
                        intIdCity=intIdCityCustomer
                        where tblCustomer.strDocument=strDocumentCustomer;
    end
$$


/* Login */
DELIMITER $$
    create procedure SP_Login(in strDocumentLogin varchar(100),in strPasswordLogin varchar(100))
        begin
	declare blnLogin varchar(20) default true;
    declare DataConsult varchar(20);
    set DataConsult=(select tblUser.strDocument from tblUser
    where tblUser.strDocument=strDocumentLogin and tblUser.strPassword=strPasswordLogin limit 1) ;
    if isnull(DataConsult) then
		set blnLogin=false;
		select blnLogin;
     else
            select blnLogin,tblUser.strDocument,tblUser.strName,tblUser.strLastName,
           tblUser.strEmail,tblUser.strPhone,tblUser.strAddress,tblUser.intIdZone,tblUser.intIdTypeUser,
           tblTypeUser.strdescription as 'strDescriptionTypeUser'
           from tblUser inner join  tblTypeUser on tblUser.intidtypeuser=tblTypeUser.intIdtypeuser
           where tblUser.strDocument=strDocumentLogin and tblUser.strPassword=strPasswordLogin limit 1;
     end if;
end
$$

/*tblproduct*/
DELIMITER $$
    create procedure SP_CreateProduct(in strIdProduct varchar(100),in strDescriptionProduct varchar(100),
    in intPriceProduct int)
    begin

        insert into tblProduct(intIdProduct,strDescription,strPrice,dtEntry) values(strIdProduct,
        strDescriptionProduct,intPriceProduct,now());

    end


$$

DELIMITER $$
    create procedure SP_ListProducts()

    begin
             select tblProduct.intIdProduct,
        tblProduct.strDescription,tblProduct.strPrice,SUBSTRING_INDEX(tblProduct.dtEntry,' ',1) as 'dtEntry' from tblProduct;

    end


$$

DELIMITER $$
    create procedure SP_EditProduct(in intIdProductEdit varchar(100),
    in strDescriptionProduct varchar(100),in strPriceProduct varchar(100))

    begin

        update tblProduct set strDescription=strDescriptionProduct,strPrice=strPriceProduct
        where tblProduct.intIdProduct=intIdProductEdit;

    end


$$
DELIMITER $$
    create procedure SP_GetProduct(in intIdProductSearch varchar(100))
    begin
         select tblProduct.intIdProduct,
         tblProduct.strDescription,tblProduct.strPrice from tblProduct
         where tblProduct.intIdProduct=intIdProductSearch;
    end
$$
/*******TBLORDER********/
DELIMITER $$
    create procedure SP_CreateOrder(in strDocumentSeller varchar(100),in strDocumentCustomer varchar(100))
     begin
        insert into tblOrder(dtFechaInicio,intNumeroItems,strDescription,intIdCustomer,intIdUser,intIdStateOrder)
        values (now(),0,'',
        (select tblCustomer.intIdCustomer from tblCustomer where tblCustomer.strDocument=strDocumentCustomer),
        (select tblUser.intIdUser from tblUser where tblUser.strDocument=strDocumentSeller),2);
        
        select  tblOrder.intIdOrder from tblOrder order by  tblOrder.intIdOrder desc limit 1;
    end
$$

DELIMITER $$
    create procedure SP_FinalOrder(in intIdOrderUpdate int)

    begin
        update tblOrder set tblOrder.intIdStateOrder=3 where tblOrder.intIdOrder=intIdOrderUpdate;
    end

$$

DELIMITER $$
    create procedure SP_CreateDetailOrder
    (in intQuantityOrder int,in intTotalOrder int,
    in intPriceProduct int, in intIdProductOrder varchar(100),
    in intIdOrderP int)
    begin

        insert into tblOrderDetail(intQuantity,intTotal,intPriceProduct,intIdProduct,intIdOrder)
        values(intQuantityOrder,intTotalOrder,intPriceProduct,intIdProductOrder,intIdOrderP);

    end
$$

DELIMITER $$
create procedure SP_ListOrdes
()
begin
 SELECT tblOrder.intIdOrder,SUBSTRING_INDEX(tblOrder.dtFechaInicio,' ',1) as 'dtFechaInicio',
    concat(tblUser.strName,tblUser.strLastName) as 'strNameSeller',
concat(tblCustomer.strName,tblCustomer.strLastName) as 'strNameCustomer' FROM tblOrder
inner join tblUser on tblUser.intiduser=tblOrder.intiduser
inner join tblCustomer on tblCustomer.intIdCustomer=tblOrder.intIdCustomer;
End
$$

/*Generañ*/
DELIMITER $$
    create procedure SP_NroUserCustomerOrder()
    begin

        select (select count(*) from tblUser) as 'NroUsers',(select count(*) from tblCustomer) as 'NroCustomers',
(select count(*) from tblOrder) as 'NroOrders';
    end

$$





INSERT INTO `tblZone` (`intIdZone`, `strDescription`) VALUES
(4, 'Occidente'),
(6, 'Sur'),
(12, 'Norte');

INSERT INTO `tblCity` (`intIdCity`, `strDescription`, `intIdZone`) VALUES
(24, 'Medellín', 4),
(25, 'Cali', 6),
(26, 'Bogota', 6);

INSERT INTO `tblCustomer` (`intIdCustomer`, `strDocument`, `strName`, `strLastName`, `strEmail`, `strPhone`, `strAddress`, `intIdCity`) VALUES
(2, '26529344', 'Juan Camilo', 'Chica Castro', 'juancamilo@gmail.com', '3113608269', 'Cll 116 # 64 D - 06', 24),
(3, '123456', 'pablo', 'castro', 'pc@gmail.com', '3113608269', 'Cll 116 # 64 D - 06', 25);


INSERT INTO `tblStateOrder` (`intIdStateOrder`, `strDescription`) VALUES
(2, 'En proceso'),
(3, 'Finalizado');


INSERT INTO `tblTypeUser` (`intIdTypeUser`, `strDescription`) VALUES
(1, 'Admin'),
(2, 'Seller');


INSERT INTO `tblUser` (`intIdUser`, `strDocument`, `strName`, `strLastName`, `strEmail`, `strPassword`, `strPhone`, `strAddress`, `intIdTypeUser`, `intIdZone`) VALUES
(1, '1020480253', 'wilson herney', 'castro cabrera', 'wilsoncastro@gmail.com', '123456', '3113608269', 'cll ', 1, 6),
(18, '4920307', 'marly esperanza', 'cabrera chavarro', 'm_cabrera@hotmail.com', '123456', '3113608269', 'Cll 116 # 64 D - 06', 2, 4),
(20, '123456', 'jean paul', 'castro cabrera', 'jp@hotmail.com', '123456', '3113608269', 'Cll 116 # 64 d 06', 2, 4);




INSERT INTO `tblOrder` (`intIdOrder`, `dtFechaInicio`, `intNumeroItems`, `strDescription`, `intIdCustomer`, `intIdUser`, `intIdStateOrder`) VALUES
(102, '2020-11-09 00:39:56', 0, '', 2, 18, 3),
(103, '2020-11-09 15:20:18', 0, '', 3, 20, 3),
(104, '2020-11-09 15:21:31', 0, '', 2, 20, 2);

INSERT INTO `tblProduct` (`intIdProduct`, `strDescription`, `strPrice`, `dtEntry`) VALUES
('CA200', 'Barberia', 4000, '2020-11-09 15:17:29'),
('CA280', 'Maquillaje', 2000, '2020-11-09 00:36:04'),
('CA281', 'Maquillaje', 3400, '2020-11-09 00:37:02');

INSERT INTO `tblOrderDetail` (`intIdOrderDetail`, `intQuantity`, `intTotal`, `intPriceProduct`, `intIdProduct`, `intIdOrder`) VALUES
(14, 3, 6000, 2000, 'CA280', 102),
(15, 4, 13600, 3400, 'CA281', 102),
(16, 5, 20000, 4000, 'CA200', 103),
(17, 10, 20000, 2000, 'CA280', 103);




