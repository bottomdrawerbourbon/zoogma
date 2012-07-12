package Site::Controller::Root;
use Moose;
use namespace::autoclean;

BEGIN { extends 'Catalyst::Controller' }

#
# Sets the actions in this controller to be registered with no prefix
# so they function identically to actions created in MyApp.pm
#
__PACKAGE__->config(namespace => '');

=head1 NAME

Site::Controller::Root - Root Controller for Site

=head1 DESCRIPTION

[enter your description here]

=head1 METHODS

=head2 auto

=cut
sub begin :Private {
    my ($self, $c) = @_;

    $c->stash->{shows} = [];
#    # Get all the current shows
    my $showsRs = $c->model('MyModel::TourDate')->search;
    while( my $show = $showsRs->next ) {
        my $day = $show->date->day;
        # Doesn't look like DateTiem will give me a suffix so figure it out myself
        my $date_suffix = ($day == 1 ? 'st' : ($day == 2 ? 'nd' : ($day == 3 ? 'rd' : 'th')));
        push( @{$c->stash->{shows}}, {
            date  => $show->date->strftime("%a.%b.%d$date_suffix.%Y"),
            venue => $show->venue,
            city  => $show->city,
            state => 'TN'
       });
    }
}
=head2 index

The root page (/)

=cut
sub index :Path :Args(0) {
    my ( $self, $c ) = @_;
    $c->forward('home/index');
}

=head2 default

=cut
sub default :Path {
    my ( $self, $c ) = @_;
    $c->forward('home/index');
}

=head2 end

Attempt to render a view, if needed.

=cut

sub end : ActionClass('RenderView') {}

=head1 AUTHOR

Nicholas McCamey,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

__PACKAGE__->meta->make_immutable;

1;
