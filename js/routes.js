page('/', Controller.showAll);
// page('/about', Controller.showId('.about'));
// page('/portfolio', Controller.showId('.portfolio'));
page('/:section', Controller.showId);

page();
