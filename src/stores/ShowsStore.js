import { toJS } from "mobx";

export const createShowsStore = () => {
    return {
        shows: [],
        show: null,
        setShows(shows) {
            this.shows = shows;
        },
        setCurrentShow(show) {
            this.show = show;
        },
        get length() {
            return this.shows ? this.shows.length : 0;
        },
        get showsPlain() {
            return toJS(this.shows)
                .map(show => show.show)
                .filter(show => show.image);
        }
    };
};
