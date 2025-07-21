const { shell } = require('electron');

class WikipediaService {
    static async searchGame(gameName) {
        try {
            const searchQuery = encodeURIComponent(gameName + ' video game');
            const wikipediaUrl = `https://pt.wikipedia.org/wiki/Special:Search?search=${searchQuery}`;
            await shell.openExternal(wikipediaUrl);
            return { success: true };
        } catch (error) {
            console.error('Erro ao abrir Wikipedia:', error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = WikipediaService;
