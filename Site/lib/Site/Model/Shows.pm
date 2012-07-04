package Site::Model::Shows;

use Moose;
extends 'Catalyst::Model';

sub get_current_shows {
    my ($self, $c) = @_;

    return [
        { date  => 'Fri APR 27 2012', venue => 'Breakers Sky Lounge', city  => 'Herndon, VA', },
        { date  => 'Fri APR 28 2012', venue => 'Venue2', city  => 'Herndon, VA', },
        { date  => 'Fri APR 30 2012', venue => 'Venue3', city  => 'Herndon, VA', },
    ];
}

1;
