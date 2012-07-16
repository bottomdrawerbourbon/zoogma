package Site::Controller::Home;
use Moose;
use namespace::autoclean;

BEGIN {extends 'Catalyst::Controller'; }

=head1 NAME

Site::Controller::Home - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut

sub index :Path :Args(0) {
    my ( $self, $c ) = @_;

    $c->stash->{template} = 'default.tt';

    # Fetch the features for the homepage...
    $c->stash->{features} = $c->model('MyModel::Feature')->search({id => 1});
    $c->stash->{current_view} = 'TT';
}

sub json :Local {
    my ( $self, $c ) = @_;
    $c->stash->{current_view} = 'JSON';
    $c->stash->{features} = $c->model('MyModel::Feature')->search({id => 1});

}

sub end : ActionClass('RenderView') {}

=head1 AUTHOR

Nicholas McCamey,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

__PACKAGE__->meta->make_immutable;

1;
