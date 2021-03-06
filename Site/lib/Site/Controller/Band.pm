package Site::Controller::Band;
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

    my $data = {};
    # First load up the endorsements
    $data->{endorsements}= $c->forward('/band/get_endorsements');

    # The bio is just a specific post. Look it up by the bio flag
    my $bioRs= $c->model('MyModel::Posts')->search({ bio => 1 }, { order_by => { -desc => 'id' } });
    if( !$bioRs ) {
        # Not sure what to do here...
        #$data->{bio} = 1;
    } else {
        my $bio = $bioRs->first;
        $data->{bio}->{post}      = $bio->post;
        $data->{bio}->{image_url} = $bio->image;

        $data->{bio}->{post} =~ s#\r\n#<br \/>#g;
        $data->{bio}->{post} =~ s#\n#<br \/>#g;
    }

    $c->stash->{data} = $data;
}

sub get_endorsements :Local {
    my ($self, $c) = @_;

    my $endorsementRs = $c->model('MyModel::Endorsements')->search();
    my %endorsements;

    while( my $endorsement = $endorsementRs->next ) {
        my $href = {
            company => $endorsement->company,
            url     => $endorsement->url,
        };
        if( ! exists $endorsements{ $endorsement->member } ) {
            $endorsements{ $endorsement->member } = [];
        }
        push( @{$endorsements{ $endorsement->member }}, $href );
    }
    return \%endorsements;
}



=head1 AUTHOR

Nicholas McCamey

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

__PACKAGE__->meta->make_immutable;

1;
