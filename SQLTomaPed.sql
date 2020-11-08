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
			tbluser.strDocument,tbluser.strName,
            tbluser.strLastName,tbluser.strEmail,tblUser.strPassword,
            tbluser.strPhone,tbluser.strAddress,
            tblzone.strDescription as 'strDescriptionZone'
				from tblUser inner join tblzone on tblzone.intIdZone=tbluser.intIdZone
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
                        where tbluser.strDocument=strDocumentUser;
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
    update tblZone set strDescription=strDescriptionZone where tblzone.intIdZone=intIdZoneEdit;
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
        select tblcity.intIdCity,tblcity.strDescription,tblzone.strDescription as 'strDescriptionZone'
         from tblCity inner join tblZone on tblZone.intIdZone=tblcity.intIdZone;
    end
$$


/*tblordersate*/

DELIMITER $$
    create procedure SP_CreateOrderState (in strDescriptionOrderState varchar(100))
    Begin   
        insert into tblstateorder(strDescription) values(strDescriptionOrderState);
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
	insert into tblcustomer 
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
			tblcustomer.strDocument,tblcustomer.strName,
            tblcustomer.strLastName,tblcustomer.strEmail,
            tblcustomer.strPhone,tblcustomer.strAddress,
            tblcity.strDescription as 'strDescriptionCity'
				from tblcustomer inner join tblcity on tblcity.intIdCity=tblcustomer.intIdCity;

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
    update tblcustomer set strDocument=strDocumentCustomer,
                        strName=strNameCustomer,
                        strLastName=strLastName,
                        strEmail=strEmailCustomer,
                        strPhone=strPhoneCustomer,
                        strAddress=strAddressCustomer,
                        intIdCity=intIdCityCustomer
                        where tblcustomer.strDocument=strDocumentCustomer;
    end
$$


/* Login */
DELIMITER $$
    create procedure SP_Login(in strDocument varchar(100),in strPassword varchar(100))
        begin
	declare blnLogin varchar(20) default true;
    declare DataConsult varchar(20);
    set DataConsult=(select tbluser.strDocument from tbluser
    where tbluser.strDocument=strDocumentLogin and tbluser.strPassword=strPasswordLogin limit 1) ;
    if isnull(DataConsult) then
		set blnLogin=false;
		select blnLogin;
     else
            select blnLogin,tbluser.strDocument,tbluser.strName,tbluser.strLastName,
           tbluser.strEmail,tbluser.strPhone,tbluser.strAddress,tbluser.intIdZone,tbluser.intIdTypeUser,
           tbltypeuser.strdescription as 'strDescriptionTypeUser'
           from tbluser inner join  tbltypeuser on tbluser.intidtypeuser=tbltypeuser.intIdtypeuser
           where tbluser.strDocument=strDocumentLogin and tbluser.strPassword=strPasswordLogin limit 1;
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
             select tblproduct.intIdProduct,
        tblproduct.strDescription,tblproduct.strPrice,SUBSTRING_INDEX(tblproduct.dtEntry,' ',1) as 'dtEntry' from tblproduct;

    end


$$

DELIMITER $$
    create procedure SP_EditProduct(in intIdProductEdit varchar(100),
    in strDescriptionProduct varchar(100),in strPriceProduct varchar(100))

    begin

        update tblproduct set strDescription=strDescriptionProduct,strPrice=strPriceProduct
        where tblproduct.intIdProduct=intIdProductEdit;

    end


$$