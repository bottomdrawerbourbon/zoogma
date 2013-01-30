package Admin::Controller::Band;
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

sub default :Path { 
    my ( $self, $c ) = @_;

    $c->stash->{current_view} = 'TT';
    
    # First load up the endorsements
    $c->stash->{endorsements}= $c->forward('/band/get_endorsements');

    # The bio is just a specific post. Look it up by the bio flag
    my $bioRs= $c->model('MyModel::Posts')->search({ bio => 1 }, { order_by => { -desc => 'id' } });
    if( !$bioRs ) {
        $c->stash->{no_configured} = 1;
        return;
    } 

    # We know we have at least one. Due to how we do order by, we are going to get the latest one
    # as the bio
    $c->stash->{bio} = $bioRs->first;
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

Nicholas McCamey,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

__PACKAGE__->meta->make_immutable;

1;
