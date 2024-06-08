from sqlalchemy import Column, Date, Float, ForeignKey, Integer, String, Table
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

# Association table for many-to-many relationship between movies and types
movies_types = Table(
    'movies_types', Base.metadata,
    Column('id_movies', Integer, ForeignKey('movies.id'), primary_key=True),
    Column('id_types', Integer, ForeignKey('types.id'), primary_key=True)
)


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String)
    birthday = Column(Date)
    created_at = Column(Date)


class Movie(Base):
    __tablename__ = 'movies'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    release_date = Column(Date)
    press_notation = Column(Float)
    people_notation = Column(Float)
    types = relationship('Type', secondary=movies_types,
                         back_populates='movies')


class Type(Base):
    __tablename__ = 'types'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    movies = relationship('Movie', secondary=movies_types,
                          back_populates='types')


class Note(Base):
    __tablename__ = 'notes'
    id = Column(Integer, primary_key=True, index=True)
    id_users = Column(Integer, ForeignKey('users.id'))
    id_movies = Column(Integer, ForeignKey('movies.id'))
    notation = Column(Integer)


class PrefType(Base):
    __tablename__ = 'pref_types'
    id = Column(Integer, primary_key=True, index=True)
    id_users = Column(Integer, ForeignKey('users.id'))
    id_types = Column(Integer, ForeignKey('types.id'))
