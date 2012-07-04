use strict;
use warnings;

use Site;

my $app = Site->apply_default_middlewares(Site->psgi_app);
$app;

