create database tech_blog;
use tech_blog;

create table blog (
    id int primary key auto_increment,
    title varchar(50) not null,
    contents text not null,
    creator_id int not null references user(id),
    created_on datetime not null default now()

)
