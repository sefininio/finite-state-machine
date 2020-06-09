export const createActorStore = () => {
    return {
        actor: null,
        setActor(actor) {
            this.actor = actor;
        },
        get name() {
            return this.actor ? this.actor.name : '';
        },
    };
}
