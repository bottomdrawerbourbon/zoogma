package Site::Controller::News;
use Moose;
use namespace::autoclean;

BEGIN {extends 'Catalyst::Controller'; }

=head1 NAME

Site::Controller::Band - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut

sub index :Path :Args(0) {
    my ( $self, $c ) = @_;

    $c->stash->{current_view} = 'JSON';
}

sub json :Local {
    my ( $self, $c ) = @_;
    $c->stash->{current_view} = 'JSON';
    my $newsRs = $c->model('MyModel::News')->search();

    my @data;
    while( my $news = $newsRs->next ) {
        push @data, {title => $news->title, story => $news->story };
    }
    
    $c->stash->{data}->{news} = \@data;
}


=head1 AUTHOR

Nicholas McCamey,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

__PACKAGE__->meta->make_immutable;

1;
