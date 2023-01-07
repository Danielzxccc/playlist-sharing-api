CREATE TABLE playlist(
    id SERIAL PRIMARY KEY,
    title STRING NOT NULL,
    link STRING NOT NULL,
    sentBy STRING NOT NULL,
    description STRING NOT NULL,
    likes INT,
    dislike INT,
    date_added DATE DEFAULT CURRENT_DATE
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    playlistid INT,
    message STRING NOT NULL,
    CONSTRAINT fk_playlistid
        FOREIGN KEY(playlistid)
             REFERENCES playlist(id)
)