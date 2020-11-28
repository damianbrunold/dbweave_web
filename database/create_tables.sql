-- create database dbweave_web;
-- create schema dbweave;

create table dbweave.account
(
    id serial primary key,
	name varchar(50) not null,
	email varchar(255) not null,
	pwhash varchar(50) not null,
	lastlogin timestamp,
	verified bool default false,
	disabled bool default false
);

create table dbweave.folder
(
    id serial primary key,
	account_id integer not null references dbweave.account(id),
	name varchar(255) not null,
	is_default_folder bool not null,
	document text
);

create table dbweave.pattern
(
    id serial primary key,
    account_id integer not null references dbweave.account(id),
    folder_id integer not null references dbweave.folder(id),
    description text,
    notes text,
    created timestamp,
    modified timestamp,
    is_public bool,
    data text,
    version int,
    preview_small text,
    preview_large text,
    origin_account integer null references dbweave.account(id),
    origin_pattern integer null references dbweave.pattern(id)
);

create table dbweave.comment
(
    id serial primary key,
    pattern_id integer not null references dbweave.pattern(id),
    account_id integer not null references dbweave.account(id),
    comment text,
    created timestamp
);

create table dbweave.follower
(
    follower_account_id integer not null references dbweave.account(id),
    followee_account_id integer not null references dbweave.account(id),
    following_since timestamp
);

create table dbweave.message
(
    from_account_id integer not null references dbweave.account(id),
    to_account_id integer not null references dbweave.account(id),
    sent timestamp,
    message text,
    is_read bool default false,
    is_deleted bool default false
);

create table dbweave.blacklist
(
    account_id integer not null references dbweave.account(id),
    blocked_account_id integer not null references dbweave.account(id)
);
