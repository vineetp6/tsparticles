import { type Container, type Engine, type ISourceOptions, type Particle } from "tsparticles-engine";
import type { IParticlesJS } from "./IParticlesJS";

const initParticlesJS = (
    engine: Engine,
): {
    /**
     * @deprecated this method is obsolete, please use the new {@link Engine.dom | tsParticles.dom}
     * The particles.js compatibility dom array
     */
    pJSDom: Container[];

    /**
     * @deprecated this method is obsolete, please use the new {@link Engine.load | tsParticles.load}
     * The particles.js compatibility instance
     */
    particlesJS: IParticlesJS;
} => {
    /**
     * Loads the provided options to create a {@link Container} object.
     * @deprecated this method is obsolete, please use the new tsParticles.load
     * @param tagId - the particles container element id
     * @param options - the options object to initialize the {@link Container}
     * @returns the loaded container
     */
    const particlesJS = (tagId: string, options: ISourceOptions): Promise<Container | undefined> => {
        return engine.load(tagId, options);
    };

    /**
     * Loads the provided json with a GET request.
     * The content will be used to create a {@link Container} object.
     * @deprecated this method is obsolete, please use the new tsParticles.loadJSON
     * @param tagId - the particles container element id
     * @param pathConfigJson - the json path to use in the GET request
     * @param callback - called after the {@link Container} is loaded and it will be passed as a parameter
     */
    particlesJS.load = (tagId: string, pathConfigJson: string, callback: (container?: Container) => void): void => {
        engine
            .loadJSON(tagId, pathConfigJson)
            .then((container) => {
                if (container) {
                    callback(container);
                }
            })
            .catch(() => {
                callback(undefined);
            });
    };

    /**
     * Adds a click handler to all the loaded {@link Container} objects.
     * @deprecated this method is obsolete, please use the new tsParticles.setOnClickHandler
     * @param callback - the function called after the click event is fired
     */
    particlesJS.setOnClickHandler = (callback: (e: Event, particles?: Particle[]) => void): void => {
        engine.setOnClickHandler(callback);
    };

    /**
     * All the {@link Container} objects loaded
     * @deprecated this method is obsolete, please use the new {@link Engine.dom | tsParticles.dom}
     */
    const pJSDom = engine.dom();

    return { particlesJS, pJSDom };
};

export { initParticlesJS };
